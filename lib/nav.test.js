const assert = require('assert');

(async function main() {
  const mod = await import('../components/Navbar/nav.helpers.js');
  const { getNavItems, isActivePath } = mod;

  const items = getNavItems();
  assert(Array.isArray(items) && items.length >= 6, 'Nav items should include all routes');
  assert(items.some(i => i.href === '/notice-board'), 'Contains Notice Board');
  assert(items.some(i => i.href === '/quizzes'), 'Contains Quizzes');
  assert(items.some(i => i.href === '/faculty-contacts'), 'Contains Faculty Contacts');
  assert(items.some(i => i.href === '/student-list'), 'Contains Student List');
  assert(items.some(i => i.href === '/about'), 'Contains About');

  // Active path checks
  assert.strictEqual(isActivePath('/', '/'), true, 'Home active on /');
  assert.strictEqual(isActivePath('/notice-board', '/notice-board'), true, 'Notice Board active');
  assert.strictEqual(isActivePath('/quizzes/math', '/quizzes'), true, 'Quizzes section active');
  assert.strictEqual(isActivePath('/about', '/quizzes'), false, 'About should not mark Quizzes active');

  console.log('nav.test: OK');
})();