<?php
$codosupport_ticket_attachments = get_post_meta( $codosupport_tickets->ID, 'codosupport_ticket_attachments', true );
$codosupport_ticket_attachments = isset($codosupport_ticket_attachments)? $codosupport_ticket_attachments: [];
$codosupport_ticket_user = get_post_meta( $codosupport_tickets->ID, 'codosupport_ticket_user', true );
$codosupport_ticket_user = isset($codosupport_ticket_user)? intval($codosupport_ticket_user): 0;
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
    <tr class="codosupport-ticket-user">
        <td style="width: 150px"><?php _e('User ID:', $this->plugin_name); ?></td>
        <td>
            <?= $codosupport_ticket_user;?>
        </td>
    </tr>
</table>
<?php
