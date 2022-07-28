/** @jsxImportSource jsx-slack */
/** @jsxFrag JSXSlack.Fragment **/
import { Blocks, Button, DatePicker, Divider, JSXSlack, Section } from 'jsx-slack';

const blockId = 'AskGoingOutDay';

export const AskGoingOutDay = () => JSXSlack(
  <Blocks>
    <Section>
      <p>おうちにいない日を教えてね :speech_balloon:</p>
    </Section>
    <Divider />
    <Section>
      <DatePicker
        blockId={blockId}
        actionId="goingOutDay"
        label="おうちにいない日を教えてね"
        placeholder="例) 2022/04/30"
      />
      <Button actionId={blockId}>登録する</Button>
    </Section>
  </Blocks>
);
