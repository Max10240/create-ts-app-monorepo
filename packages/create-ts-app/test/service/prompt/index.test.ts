import { PromptService, QuestionList } from '@/service/prompt/index.js';
import { expect, test } from 'vitest';

test.skip('prompt all questions', async () => {
  const prompt = new PromptService(QuestionList.map(q => q.name));

  const answer = await prompt.prompt();

  expect(answer).toMatchInlineSnapshot();
});
