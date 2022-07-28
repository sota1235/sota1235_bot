import { App } from '@slack/bolt';
import { MessageHandler } from './index';
import { AskGoingOutDay } from '../views/askGoingOutDay';

export const registerHolidayHandler: MessageHandler = (app: App) => {
  app.message(/holiday (.*)/i, async ({ body, client}) => {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: AskGoingOutDay(),
    });
  });

  return {
    command: 'holiday',
    description: 'おうちにいない日を登録する',
  };
};
