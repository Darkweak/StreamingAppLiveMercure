<?php


namespace App\Subscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Url;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Contracts\HttpClient\HttpClientInterface;

final class UrlSubscriber implements EventSubscriberInterface
{
	private $client;

	public function __construct(HttpClientInterface $client)
	{
		$this->client = $client;
	}

	public static function getSubscribedEvents()
	{
		return [
			KernelEvents::VIEW => ['notifyClients', EventPriorities::POST_WRITE],
		];
	}

	public function notifyClients(ViewEvent $event): void
	{
		$url = $event->getControllerResult();
		$method = $event->getRequest()->getMethod();

		if ($url instanceof Url && Request::METHOD_PUT === $method) {
			$this->client->request(
				Request::METHOD_POST,
				"http://websocket-StreamingAppLiveMercure:25564?url={$url->getUrl()}"
			);
		}

		return;
	}
}
