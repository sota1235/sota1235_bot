import * as Sentry from '@sentry/node';
import { CaptureContext } from '@sentry/types';

const environment = process.env.NODE_ENV;
const isProduction = process.env.NODE_ENV === 'production';

export function initSentry() {
  if (isProduction) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 1.0,
      debug: !isProduction,
      environment,
    });
  }
}

export function captureException(err: Error, captureContext?: CaptureContext) {
  if (isProduction) {
    Sentry.captureException(err, captureContext);
  } else {
    console.error(err);
  }
}