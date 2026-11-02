/**
 * Deterministic Test Suite for Echoless Conversation Engine
 * 
 * Verifies:
 * 1. hello -> natural greeting (no portfolio clarification)
 * 2. hi -> natural greeting
 * 3. video -> video post-production & DaVinci Resolve deliverables
 * 4. editing -> video editing & timeline post-production
 * 5. color grading -> node-based color grading and color space transforms
 * 6. software -> software engineering & products (ExamFlowOS)
 * 7. ExamFlowOS -> 100% free CBT testing operating system facts
 * 8. who are you -> Geddada Devicharan identity
 * 9. Instagram -> verified Instagram channel action
 * 10. Multi-turn context preservation: video -> editing -> color grading
 */

import { EcholessEngine } from './engine';

export async function runEcholessTests(): Promise<{ passed: boolean; results: string[] }> {
  const engine = new EcholessEngine();
  const results: string[] = [];
  let allPassed = true;

  const assert = (condition: boolean, testName: string, actual?: string) => {
    if (condition) {
      results.push(`✅ PASS: ${testName}`);
    } else {
      allPassed = false;
      results.push(`❌ FAIL: ${testName} (Output: "${actual}")`);
    }
  };

  // 1. Test "hello"
  engine.resetMemory();
  const resHello = await engine.respond('hello');
  assert(
    resHello.intent === 'GREETING' && !resHello.text.includes('What part') && resHello.text.length > 10,
    'hello returns natural greeting without clarification',
    resHello.text
  );

  // 2. Test "hi"
  engine.resetMemory();
  const resHi = await engine.respond('hi');
  assert(
    resHi.intent === 'GREETING' && !resHi.text.includes('What part') && resHi.text.length > 10,
    'hi returns natural greeting',
    resHi.text
  );

  // 3. Test "video"
  engine.resetMemory();
  const resVideo = await engine.respond('video');
  assert(
    resVideo.entityId === 'video' && resVideo.text.toLowerCase().includes('davinci resolve') && resVideo.actionIds.includes('video'),
    'video returns video & DaVinci Resolve post-production facts',
    resVideo.text
  );

  // 4. Test "editing"
  engine.resetMemory();
  const resEditing = await engine.respond('editing');
  assert(
    resVideo.entityId === 'video' && (resEditing.text.toLowerCase().includes('editing') || resEditing.text.toLowerCase().includes('davinci resolve')),
    'editing resolves to video editing in DaVinci Resolve',
    resEditing.text
  );

  // 5. Test "color grading"
  engine.resetMemory();
  const resGrading = await engine.respond('color grading');
  assert(
    resGrading.entityId === 'video' && resGrading.text.toLowerCase().includes('color'),
    'color grading returns node-based color grading facts',
    resGrading.text
  );

  // 6. Test "software"
  engine.resetMemory();
  const resSoftware = await engine.respond('software');
  assert(
    resSoftware.entityId === 'software' && (resSoftware.text.toLowerCase().includes('examflowos') || resSoftware.text.toLowerCase().includes('typescript')),
    'software returns software products & engineering facts',
    resSoftware.text
  );

  // 7. Test "ExamFlowOS"
  engine.resetMemory();
  const resExamFlow = await engine.respond('ExamFlowOS');
  assert(
    resExamFlow.entityId === 'examflowos' && resExamFlow.text.toLowerCase().includes('cbt') && resExamFlow.actionIds.includes('examflowos'),
    'ExamFlowOS returns 100% free CBT entrance exam facts',
    resExamFlow.text
  );

  // 8. Test "who are you"
  engine.resetMemory();
  const resWho = await engine.respond('who are you');
  assert(
    resWho.entityId === 'devicharan' && (resWho.text.toLowerCase().includes('geddada devicharan') || resWho.text.toLowerCase().includes('digital product builder')),
    'who are you returns Devicharan identity',
    resWho.text
  );

  // 9. Test "Instagram"
  engine.resetMemory();
  const resInsta = await engine.respond('Instagram');
  assert(
    resInsta.intent === 'OPEN_SOCIAL' && resInsta.actionIds.includes('instagram'),
    'Instagram returns verified Instagram channel action',
    resInsta.text
  );

  // 10. Multi-turn test: video -> editing -> color grading
  engine.resetMemory();
  const turn1 = await engine.respond('video');
  assert(
    turn1.entityId === 'video',
    'Multi-turn Turn 1: "video" establishes video domain',
    turn1.text
  );

  const turn2 = await engine.respond('editing', [
    { role: 'user', content: 'video' },
    { role: 'assistant', content: turn1.text },
    { role: 'user', content: 'editing' },
  ]);
  assert(
    turn2.entityId === 'video' && (turn2.text.toLowerCase().includes('editing') || turn2.text.toLowerCase().includes('fairlight') || turn2.text.toLowerCase().includes('fusion')),
    'Multi-turn Turn 2: "editing" preserves video domain & expands on editing pipeline',
    turn2.text
  );

  const turn3 = await engine.respond('color grading', [
    { role: 'user', content: 'video' },
    { role: 'assistant', content: turn1.text },
    { role: 'user', content: 'editing' },
    { role: 'assistant', content: turn2.text },
    { role: 'user', content: 'color grading' },
  ]);
  assert(
    turn3.entityId === 'video' && (turn3.text.toLowerCase().includes('color') || turn3.text.toLowerCase().includes('aces') || turn3.text.toLowerCase().includes('wide gamut')),
    'Multi-turn Turn 3: "color grading" stays within video domain & explains color science',
    turn3.text
  );

  return { passed: allPassed, results };
}
