<?php
$codosupport_tickets_options = get_post_meta( $codosupport_tickets->ID, 'codosupport_tickets_options', true );

if(is_array($codosupport_tickets_options)){
    $codosupport_ticket_attachments = isset($codosupport_tickets_options['codosupport_ticket_attachments']) ? $codosupport_tickets_options['codosupport_ticket_attachments'] : [];
}
?>
<table>
    <tr class="codosupport-ticket-attachments">
        <td style="width: 150px"><?php _e('Attachments:', $this->plugin_name); ?></td>
        <td>
            <?php 
            foreach((array) $codosupport_ticket_attachments as $attach){
                ?>
                    <div id="<?= 'codosupport-file-id-'.$attach['attach_id'];?>">
                        <a href="<?= $attach['url'];?>" target="_blank"><?= $attach['name'];?></a>
                    </div>
                <?php
            }
            ?>
        </td>
    </tr>
</table>
<?php
