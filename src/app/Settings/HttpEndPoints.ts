// set all HttpEndPoints in one file and each class is an object to handle APIs maintenance

export class HttpEndPoints {

  public static user = {
    getAllUsers: 'https://reqres.in/api/users?page={page}',
    getUserById: 'https://reqres.in/api/users/{id}'
  }

}
