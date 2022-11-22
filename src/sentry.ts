import * as Sentry from '@sentry/node';
import { CaptureContext } from '@sentry/types';

const environment = process.env.NODE_ENV;
const isProduction = process.env.NODE_ENV === 'production';

export function initSentry() {
  if (isProduction && process.env.SENTRY_DSN !== undefined) {
    Sentry.init({
      release: process.env.HEROKU_RELEASE_VERSION, // FIXME
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 1.0,
      debug: !isProduction,
      environment,
    });
    console.log('⚡️ Sentry initialized!');
  }
}

export function captureException(err: Error, captureContext?: CaptureContext) {
  if (isProduction) {
    Sentry.captureException(err, captureContext);
  } else {
    console.error(err);
  }
}
