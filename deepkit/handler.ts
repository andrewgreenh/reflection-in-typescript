import { App } from "@deepkit/app";
import { FrameworkModule } from "@deepkit/framework";
import { http, HttpQuery } from "@deepkit/http";
import { Database } from "@deepkit/orm";
import { entity, integer, Maximum, Positive } from "@deepkit/type";

@entity.name("user")
class User {
  id: number = 0;
  name: string = "";
}

@http.controller()
class UserAPI {
  constructor(private database: Database) {}

  @http.GET("/user/:id")
  async user(id: integer & Positive): Promise<User> {
    return await this.database.query(User).filter({ id }).findOne();
  }

  @http.GET("/user")
  async users(limit: HttpQuery<integer> & Maximum<100> = 10): Promise<User[]> {
    return await this.database.query(User).limit(limit).find();
  }
}

new App({
  controllers: [UserAPI],
  imports: [new FrameworkModule()],
}).run();
