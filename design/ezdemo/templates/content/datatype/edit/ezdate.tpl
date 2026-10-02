{* The calendar of the icon below: Exponential UI's exp::datepicker (defines showDatePicker()), with the
   page configuration it reads; front-end designs do not load the admin's script list *}
{exp_config()}
{ezscript_require( array( 'ezjsc::jquery', 'exp::core::shared', 'exp::datepicker' ) )}
{ezcss_require( array( 'exp/core.css', 'exp/datepicker.css' ) )}

{default attribute_base=ContentObjectAttribute}
<div class="block">
<div class="date">

<div class="element">
<label>{'Year'|i18n( 'design/ezdemo/content/datatype' )}:</label>
<input  id="ezcoa-{if ne( $attribute_base, 'ContentObjectAttribute' )}{$attribute_base}-{/if}{$attribute.contentclassattribute_id}_{$attribute.contentclass_attribute_identifier}_year" class="ezcc-{$attribute.object.content_class.identifier} ezcca-{$attribute.object.content_class.identifier}_{$attribute.contentclass_attribute_identifier}" type="text" name="{$attribute_base}_date_year_{$attribute.id}" size="5" value="{section show=$attribute.content.is_valid}{$attribute.content.year}{/section}" />
</div>

<div class="element">
<label>{'Month'|i18n( 'design/ezdemo/content/datatype' )}:</label>
<input  id="ezcoa-{if ne( $attribute_base, 'ContentObjectAttribute' )}{$attribute_base}-{/if}{$attribute.contentclassattribute_id}_{$attribute.contentclass_attribute_identifier}_month" class="ezcc-{$attribute.object.content_class.identifier} ezcca-{$attribute.object.content_class.identifier}_{$attribute.contentclass_attribute_identifier}" type="text" name="{$attribute_base}_date_month_{$attribute.id}" size="3" value="{section show=$attribute.content.is_valid}{$attribute.content.month}{/section}" />
</div>

<div class="element">
<label>{'Day'|i18n( 'design/ezdemo/content/datatype' )}:</label>
<input id="ezcoa-{if ne( $attribute_base, 'ContentObjectAttribute' )}{$attribute_base}-{/if}{$attribute.contentclassattribute_id}_{$attribute.contentclass_attribute_identifier}_day" class="ezcc-{$attribute.object.content_class.identifier} ezcca-{$attribute.object.content_class.identifier}_{$attribute.contentclass_attribute_identifier}" type="text" name="{$attribute_base}_date_day_{$attribute.id}" size="3" value="{section show=$attribute.content.is_valid}{$attribute.content.day}{/section}" />
</div>
<div class="element">
<img class="datepicker-icon" src={"calendar_icon.png"|ezimage} id="{$attribute_base}_date_cal_{$attribute.id}" width="24" height="28" onclick="showDatePicker( '{$attribute_base}', '{$attribute.id}', 'date' );" style="cursor: pointer;" alt="{'Show calendar to select a date.'|i18n( 'design/ezdemo/content/datatype' )}" />
<div id="{$attribute_base}_date_cal_container_{$attribute.id}" style="display: none; position: absolute;"></div>
&nbsp;
&nbsp;
&nbsp;
&nbsp;
</div>

<div class="break"></div>
</div>
</div>
{/default}
