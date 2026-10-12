# My PHP MySQL Application

This project is a simple PHP application that utilizes a MySQL database for user management. It provides a RESTful API for handling user-related operations.

## Project Structure

```
my-php-mysql-app
├── app
│   ├── bootstrap.php          # Initializes the application and sets up autoloading
│   ├── config
│   │   └── database.php       # Database configuration settings
│   ├── controllers
│   │   └── UserController.php  # Handles user-related API requests
│   ├── models
│   │   └── User.php           # Represents the user entity
│   ├── routes
│   │   └── api.php            # API routes for the application
│   └── services
│       └── UserService.php     # Business logic related to user operations
├── public
│   └── index.php              # Entry point of the application
├── .env.example                # Example of environment variables
├── composer.json               # Composer configuration file
├── README.md                   # Project documentation
├── schema.sql                  # SQL statements for creating the database schema
├── .gitignore                  # Files and directories to ignore by Git
└── phpunit.xml                # PHPUnit configuration file
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd my-php-mysql-app
   ```

2. **Install dependencies:**
   Make sure you have Composer installed, then run:
   ```
   composer install
   ```

3. **Configure the database:**
   Rename `.env.example` to `.env` and update the database credentials in `app/config/database.php`.

4. **Create the database schema:**
   Run the SQL statements in `schema.sql` to set up the database.

5. **Run the application:**
   You can use a local server or PHP's built-in server:
   ```
   php -S localhost:8000 -t public
   ```

## Usage

- The API endpoints are defined in `app/routes/api.php`.
- You can interact with the user management features through the defined routes.

## Testing

To run tests, use PHPUnit:
```
./vendor/bin/phpunit
```

## License

This project is licensed under the MIT License.