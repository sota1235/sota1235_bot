import { SlackEventMiddlewareArgs } from '@slack/bolt';
import { checked } from './checked';

export type ReactionAddedHandler = (
  args: SlackEventMiddlewareArgs<'reaction_added'>,
) => void;

const handlerMappings: { [key: string]: ReactionAddedHandler } = {
  white_check_mark: checked,
};

export default handlerMappings;
