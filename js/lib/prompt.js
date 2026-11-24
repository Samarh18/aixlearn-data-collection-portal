// The transcription prompt students copy into their AI tool.

const PROMPT=`Please transcribe our full conversation above into the exact format below.

Rules:
• Keep the wording identical to the original.
• Do not summarize, shorten, correct, or rewrite anything.
• Do not skip any turn.
• Do not add explanations or comments before or after the transcript.
• Do not include this transcription request in the transcript.
• Use these exact delimiter lines before each turn:

For my messages, write:
<<<USER_TURN>>>

For your messages, write:
<<<LLM_TURN>>>

• Put each delimiter on its own line.
• Put the full message content immediately after the delimiter.
• Begin the transcript with:
BEGIN_LLM_TRANSCRIPT_1

• End the transcript with:
END_LLM_TRANSCRIPT_1

If the transcript is too long to fit in one response:
• Stop only at the end of a complete turn.
• Write:
CONTINUED_IN_NEXT_RESPONSE

• When I write "continue," continue from the exact next turn.
• Use the same format and increase the transcript number for each new section.

Output format:

BEGIN_LLM_TRANSCRIPT_1
<<<USER_TURN>>>
[message]
<<<LLM_TURN>>>
[response]
<<<USER_TURN>>>
[message]
<<<LLM_TURN>>>
[response]
END_LLM_TRANSCRIPT_1`;
