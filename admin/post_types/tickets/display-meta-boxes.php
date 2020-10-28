<?php
$codosupport_tickets_options = get_post_meta( $codosupport_tickets->ID, 'codosupport_tickets_options', true );

if(is_array($codosupport_tickets_options)){
    $codosupport_ticket_respondent = (isset($codosupport_tickets_options['codosupport_ticket_respondent'])) ? esc_html( $codosupport_tickets_options['codosupport_ticket_respondent'] ) : '';
    $users = get_users( array( 'fields' => array( 'ID', 'display_name' ) ) );
}
?>
<table>
    <tr class="codosupport-ticket-respondent">
        <td style="width: 150px"><?php _e('Assign Respondent', $this->plugin_name); ?></td>
        <td>
            <select name="codosupport_ticket_respondent" id="codosupport_ticket_respondent">
                <option value="0" <?php if($codosupport_ticket_respondent == ''){echo 'selected';}?> ><?php _e('Select User', $this->plugin_name);?></option>
                <?php
                foreach($users as $user):
                    ?>
                    <option value="<?php echo $user->ID;?>" <?php if($codosupport_ticket_respondent == $user->ID){echo 'selected';}?> ><?php _e($user->display_name, $this->plugin_name);?></option>
                    <?php 
                endforeach;
                ?>
            </select>
        </td>
    </tr>
</table>
<?php
