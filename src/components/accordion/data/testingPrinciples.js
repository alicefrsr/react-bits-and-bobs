const testingPrinciples = [
  {
    heading: 'Testing shows the presence, not the absence of defects.',
    content:
      'Testing can show that defects are present in the test object, but cannot prove that there are no defects (Buxton 1970). Testing reduces the probability of defects remaining undiscovered in the test object, but even if no defects are found, testing cannot prove test object correctness.',
  },
  {
    heading: 'Exhaustive testing is impossible.',
    content:
      'Testing everything is not feasible except in trivial cases (Manna 1978). Rather than attempting to test exhaustively, test techniques (see chapter 4), test case prioritization, and risk-based testing, should be used to focus test efforts.',
  },
  {
    heading: 'Early testing saves time and money.',
    content:
      'Defects that are removed early in the process will not cause subsequent defects in derived work products. The cost of quality will be reduced since fewer failures will occur later in the SDLC (Boehm 1981). To find defects early, both static testing (see chapter 3) and dynamic testing (see chapter 4) should be started as early as possible.',
  },
  {
    heading: 'Defects cluster together.',
    content:
      'A small number of system components usually contain most of the defects discovered or are responsible for most of the operational failures (Enders 1975). This phenomenon is an illustration of the Pareto principle. Predicted defect clusters, and actual defect clusters observed during testing or in operation, are an important input for risk-based testing.',
  },
  {
    heading: 'Tests wear out. (Pesticide Paradox)',
    content:
      'If the same tests are repeated many times, they become increasingly ineffective in detecting new defects (Beizer 1990). To overcome this effect, existing tests and test data may need to be modified, and new tests may need to be written. However, in some cases, repeating the same tests can have a beneficial outcome, e.g., in automated regression testing.',
  },
  {
    heading: ' Testing is context dependent.',
    content:
      'There is no single universally applicable approach to testing. Testing is done differently in different contexts (Kaner 2011).',
  },
  {
    heading: 'Absence-of-defects fallacy.',
    content:
      'It is a fallacy (i.e., a misconception) to expect that software verification will ensure the success of a system. Thoroughly testing all the specified requirements and fixing all the defects found could still produce a system that does not fulfill the users’ needs and expectations, that does not help in achieving the customer’s business goals, and that is inferior compared to other competing systems. In addition to verification, validation should also be carried out (Boehm 1981).',
  },
];

export default testingPrinciples;
