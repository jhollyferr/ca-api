# CA-API

An api for allocating students in the classroom

## Objectives:
- Allow a student to register and nanage their data
- Allow a teacher to register and manage their data
- Enable a teacher to create and manage classrooms
- Enabling a teacher to allocate students to classrooms

## Technologies used
- AdonisJS
- NodeJS
- SQLite
- Typescript

## How it works?

1. Clone this repository: 
    ```bash
    git clone https://github.com/jhollyferr/ca-api.git
    ```
2. Run the command to install the dependencies
    ```bash
    yarn
    ```
3. Run the project
    ```bash
    yarn dev
    ```
4. Test the endpoints
    
    - Set your base url
        ```bash
        	{base_url}: "http://localhost:3333/ca-api"
        ```
    |          | Students | Teachers | 
    |----------|----------|----------|
    | CREATE|`{base_url}/students`| `{base_url}/teachers` | 
    | GET | `{base_url}/students` | `{base_url}/teachers` |
    | GET | `{base_url}/students/{registration}` | `{base_url}/teachers/{registration}` |
    | GET | `{base_url}/students/{registration}/allocation` |                           |
    | PUT | `{base_url}/students/{registration}` | `{base_url}/teachers/{registration}` | 
    | DELETE | `{base_url}/students/{registration}` | `{base_url}/teachers/{registration}`|

    |          | Classrooms | 
    |----------|----------|----------|
    | CREATE|`{base_url}/teachers/{teacher_registration}/classrooms`| 
    | GET | `{base_url}/teachers/{teacher_registration}/classrooms` | 
    | GET | `{base_url}/teachers/{teacher_registration}/classrooms/{classroom_registration}` | 
    | PUT | `{base_url}/teachers/{teacher_registration}/classrooms/{classroom_registration}` | 
    | DELETE | `{base_url}/teachers/{teacher_registration}/classrooms/{classroom_registration}` |

    |        | Allocations |
    |--------|-------------|
    | CREATE |`{base_url}/teachers/{teacher_registration}/classrooms/allocation` | 
    | GET |`{base_url}/teachers/{teacher_registration}/classrooms/{classroom_registration}/allocation` | 
    | DELETE |`{base_url}/teachers/{teacher_registration}/allocation` | 


<br/>  
<br/>  

> with ❤️ <a href="#">Jhollyfer Rodrigues</a>