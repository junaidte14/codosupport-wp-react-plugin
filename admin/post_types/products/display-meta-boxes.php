<?php
$users = get_users( array( 'fields' => array( 'ID', 'display_name' ) ) );
$codosupport_product_price = intval(get_post_meta( $codosupport_products->ID, 'codosupport_product_price', true ));
$codosupport_product_respondent = intval(get_post_meta( $codosupport_products->ID, 'codosupport_product_respondent', true ));
?>
<table>
    <tr class="codosupport-product-price">
        <td style="width: 150px"><?php _e('Price', $this->plugin_name); ?></td>
        <td><input type="text" size="80" id="codosupport_product_price" name="codosupport_product_price" value="<?php echo esc_attr($codosupport_product_price); ?>" /></td>
    </tr>
    <tr class="codosupport-product-respondent">
        <td style="width: 150px"><?php _e('Respondent', $this->plugin_name); ?></td>
        <td>
            <select name="codosupport_product_respondent">
                <option value="" <?php if($codosupport_product_respondent == ''){echo 'selected';}?> ><?php _e('Select Respondent', $this->plugin_name);?></option>
                <?php
                foreach($users as $user):
                    ?>
                    <option value="<?php echo $user->ID;?>" <?php if($codosupport_product_respondent == $user->ID){echo 'selected';}?> ><?php _e($user->display_name, $this->plugin_name);?></option>
                    <?php 
                endforeach;
                ?>
            </select>
        </td>
    </tr>
</table>
<?php
