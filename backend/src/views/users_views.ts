import Users from "../models/Users";

export default {
  render(users: Users) {
    return {
      id: users.id,
      name: users.name,
      email: users.email,
      password: users.password,
    };
  },

  renderMany(users: Users[]) {
    return users.map((user) => this.render(user));
  },
};
