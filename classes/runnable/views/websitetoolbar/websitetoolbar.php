<?php
/**
 * The code of extension/ezwt/modules/websitetoolbar/websitetoolbar.php, moved into a class (#207 stage 1). The file extension/ezwt/modules/websitetoolbar/websitetoolbar.php is one call to it.
 * Guide: doc/bc/6.0/cli_cronjob_view_abstractions.md
 */

namespace Exponential\View\Extension\Ezwt\Websitetoolbar
{

class Websitetoolbar extends \Exponential\Runnable\ModuleView
{
    public function run( array $scope )
    {
        // the including function's variables ($Params, $Module, $cli, ...)
        foreach ( array_keys( $scope ) as $__name )
            if ( $__name !== 'this' && $__name !== 'scope' )
                ${$__name} = &$scope[$__name];
        unset( $__name );

        \eZExecution::cleanExit();

        return $this->viewResult( isset( $Result ) ? $Result : null, null );
    }
}

}
