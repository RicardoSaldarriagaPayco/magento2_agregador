<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit20f78dd566b4a8ee094bb1cc1b0ae9eb
{
    public static $files = array (
        '8f8fc66c84d9779c1848311f82908180' => __DIR__ . '/../..' . '/registration.php',
    );

    public static $prefixLengthsPsr4 = array (
        'P' =>
        array (
            'Pago\\Paycoagregador\\' => 17,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Pago\\Paycoagregador\\' =>
        array (
            0 => __DIR__ . '/../..' . '/',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit20f78dd566b4a8ee094bb1cc1b0ae9eb::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit20f78dd566b4a8ee094bb1cc1b0ae9eb::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
