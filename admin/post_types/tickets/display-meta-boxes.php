<?php
$codosupport_tickets_options = get_post_meta( $codosupport_tickets->ID, 'codosupport_tickets_options', true );

if(is_array($codosupport_tickets_options)){
    $codosupport_ticket_attachments = isset($codosupport_tickets_options['codosupport_ticket_attachments']) ? esc_html( $codosupport_tickets_options['codosupport_ticket_attachments'] ) : '';
}
?>
<table>
    <tr class="codosupport-ticket-attachments">
        <td style="width: 150px"><?php _e('Attachments', $this->plugin_name); ?></td>
        <td>
            <?php var_dump($codosupport_ticket_attachments);?>
        </td>
    </tr>
</table>
<?php
