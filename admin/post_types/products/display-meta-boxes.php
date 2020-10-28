<?php
$codosupport_products_options = get_post_meta( $codosupport_products->ID, 'codosupport_products_options', true );

if(is_array($codosupport_products_options)){
    $codosupport_product_price = (isset($codosupport_products_options['codosupport_product_price'])) ? esc_html( $codosupport_products_options['codosupport_product_price'] ) : 0;
}
?>
<table>
    <tr class="codosupport-product-price">
        <td style="width: 150px"><?php _e('Price', $this->plugin_name); ?></td>
        <td><input type="text" size="80" id="codosupport_product_price" name="codosupport_product_price" value="<?php echo esc_attr($codosupport_product_price); ?>" /></td>
    </tr>
</table>
<?php
