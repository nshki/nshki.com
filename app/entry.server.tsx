import type { EntryContext, HandleDataRequestFunction } from '@remix-run/node'
import { RemixServer } from '@remix-run/react'
import { renderToString } from 'react-dom/server'
import etag from 'etag'

export default function handleRequest (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  let markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  )

  responseHeaders.set('Content-Type', 'text/html')
  responseHeaders.set('Etag', etag(markup))

  if (request.headers.get('If-None-Match') === responseHeaders.get('Etag')) {
    return new Response('', { status: 304, headers: responseHeaders })
  }

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}

export const handleDataRequest: HandleDataRequestFunction = async (
  response: Response,
  { request }
) => {
  let body = await response.text()

  if (request.method.toLowerCase() === 'get') {
    response.headers.set('etag', etag(body))

    if (request.headers.get('If-None-Match') === response.headers.get('Etag')) {
      return new Response('', { status: 304, headers: response.headers })
    }
  }

  return response;
}
