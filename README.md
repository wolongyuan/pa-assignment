# Spreadsheet
* An [assignment](http://www.dairymgt.info/opportunities/pa/assignment.php) used to apply for a [project assistant](http://www.dairymgt.info/opportunities/pa/) position at UW-Madison.
* Implemented with techniques including `PhpSpreadsheet`, `jQuery`, `Google Charts`.

## Getting Started

### Prerequisites
[Composer](https://getcomposer.org/) is a dependency Manager for PHP. Make sure you have installed composer. If not, follow the instructions below.

Download the setup program.
```bash
$ php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
```

Install composer to a specific directory and specify the filename.
```bash
$ php composer-setup.php --install-dir=/usr/bin --filename=composer
```

Test installation
```bash
$ which composer
/usr/bin/composer
```

### Install PhpSpreadsheet

Use composer to install [PhpSpreadsheet](http://phpspreadsheet.readthedocs.io/en/develop/) into this project.

```bash
composer require phpoffice/phpspreadsheet:dev-develop
```


## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/wolongyuan/spreadsheet/blob/master/LICENSE) file for details