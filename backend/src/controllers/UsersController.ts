import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import usersView from "../views/users_views";
import * as Yup from "yup";

import Users from "../models/Users";

const { SECRET_TOKEN } = process.env;
const SECRET = Buffer.from(SECRET_TOKEN).toString("base64");

const getToken = (id, name, email) =>
  jwt.sign(
    {
      id,
      name,
      email,
    },
    SECRET,
    { expiresIn: "1d" }
  );

export default {
  async index(request: Request, response: Response) {
    const usersRepository = getRepository(Users);
    const users = await usersRepository.find();
    return response.json(usersView.renderMany(users));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const usersRepository = getRepository(Users);
    const users = await usersRepository.findOneOrFail(id);
    return response.json(usersView.render(users));
  },

  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const usersRepository = getRepository(Users);
    const password = await bcrypt.hash(request.body.password, 10);

    const data = {
      name,
      email,
      password,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const user = usersRepository.create(data);

    await usersRepository.save(user);
    return response.status(201).json(user);
  },

  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;

    const usersRepository = getRepository(Users);
    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      return response.status(401).json({ message: "user unauthorized" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = getToken(user.id, user.name, user.email);
      return response.status(200).json({ token });
    } else {
      return response.status(401).json({ message: "user unauthorized" });
    }
  },
};
