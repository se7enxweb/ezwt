{* The toolbar's "?": the Help center of Exponential (exphelp/dashboard, Exponential 6.0.15 and later) in the
   administration, where the administration is known (site.ini [SiteSettings] AdditionalLoginFormActionURL, as the
   toolbar's "Go to admin interface" link reads it), else on this siteaccess. Without the exphelp module (an older
   kernel) it opens the online documentation. A new window, as before. *}
{def $ezwt_help_admin = cond( ezini_hasvariable( 'SiteSettings', 'AdditionalLoginFormActionURL' ), ezini( 'SiteSettings', 'AdditionalLoginFormActionURL' )|explode( 'user/login' )[0], '' )
     $ezwt_help_url = 'https://exponential.doc.exponential.earth/Exponential'
     $ezwt_help_label = 'Documentation'|i18n( 'design/standard/parts/website_toolbar' )}
{if ezmodule( 'exphelp/dashboard' )}
    {set $ezwt_help_url = cond( $ezwt_help_admin|ne( '' ), concat( $ezwt_help_admin, 'exphelp/dashboard' ), '/exphelp/dashboard'|ezurl( 'no' ) )
         $ezwt_help_label = 'Help center'|i18n( 'design/standard/parts/website_toolbar' )}
{/if}
<div id="ezwt-help">
<a href="{$ezwt_help_url|wash}" title="{$ezwt_help_label|wash}" target="_blank" rel="noopener"><span class="hide">{$ezwt_help_label|wash}</span>?</a>
</div>
{undef $ezwt_help_admin $ezwt_help_url $ezwt_help_label}
