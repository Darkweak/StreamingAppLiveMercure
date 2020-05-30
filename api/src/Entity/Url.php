<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     	collectionOperations={
 *     		"get"
 *	 	},
 *     	itemOperations={
 *     		"get",
 *     		"patch",
 *     		"put"
 *	 	},
 *	 	mercure="true"
 * )
 * @ORM\Entity
 */
class Url
{
    /**
     * @var int
     *
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(type="text")
     * @Assert\NotBlank
     */
    private $url;

    public function getId(): int
    {
        return $this->id;
    }

	public function getUrl(): string
	{
		return $this->url;
	}

	public function setUrl(string $url): self
	{
		$this->url = $url;
		return $this;
	}
}
