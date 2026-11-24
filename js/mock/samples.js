// MOCK DATA: sample files for the prototype-only buttons.

const SAMPLE_OK="User: I don't understand when to use Bayes' rule vs total probability.\nChatGPT: Total probability gives you P(A) by splitting over cases. Bayes flips the conditional: it gives P(B|A) from P(A|B).\nUser: אז בשאלה 3 מהמבחן הקודם, איזה מהם צריך?\nChatGPT: בשאלה 3 נתון P(positive|sick) ומבקשים P(sick|positive), לכן זה Bayes.\nUser: OK so the denominator is the total probability part?\nChatGPT: Exactly. The denominator is P(positive), which you compute with the law of total probability.";
const SAMPLE_BAD="I asked it about Bayes and it said to use total probability for the denominator.\nThen I asked about question 3 and it explained it again.\nAlso some notes for myself.";
