import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import usersView from "../views/users_views";
import * as Yup from "yup";

import Users from "../models/Users";

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
    const { name, email, password } = request.body;

    const SALTROUND = 10;
    const usersRepository = getRepository(Users);
    const hashPassword = bcrypt.hash(password, SALTROUND);

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
    const user = await usersRepository.findOneOrFail(email);
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      return response.status(200).json(user);
    } else {
      return response.status(401).json(user);
    }
  },
};
