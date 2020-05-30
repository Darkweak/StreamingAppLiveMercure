<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20200530125541 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
    	$this->addSql("INSERT INTO url (id, url) VALUES (1, 'https://player.vimeo.com/video/423643722')");
    }

    public function down(Schema $schema) : void
    {
		$this->addSql("DELETE FROM url where 1=1");
    }
}
