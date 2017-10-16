## Install Composer

Composer is a dependency Manager for PHP. Make sure you have installed composer. If not, follow the instructions below.

```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php --install-dir=/usr/bin --filename=composer
which composer
/usr/bin/composer
```

## Install PhpSpreadsheet

Use composer to install PhpSpreadsheet into your project.

```bash
composer require phpoffice/phpspreadsheet
```

