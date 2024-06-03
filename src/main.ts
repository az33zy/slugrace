import slug from 'slug';
import slugify from 'slugify';
import sindreSorhusSlugify from '@sindresorhus/slugify';
import vocaSlugify from 'voca/slugify';
import lodashKebabCase from 'lodash/kebabCase';

const slugs: {
  name: string;
  transform: (input: string) => string;
  npm?: string;
}[] = [
  { name: 'slug', transform: slug },
  { name: 'slugify', transform: slugify },
  { name: '@sindresorhus/slugify', transform: sindreSorhusSlugify },
  { name: 'voca/slugify', transform: vocaSlugify, npm: 'voca' },
  { name: 'lodash/kebabCase', transform: lodashKebabCase, npm: 'lodash' },
];

const input = document.getElementById('input') as HTMLInputElement;
const expectedOutput = document.getElementById('output') as HTMLInputElement;
const rows = document.getElementById('rows') as HTMLDivElement;

slugs.forEach((slug) => {
  const row = document.createElement('div');
  row.className = 'row';
  row.innerHTML = `
    <div><a href="https://npmjs.com/package/${slug.npm ?? slug.name}" target="_blank" rel="noreferrer">${slug.name}</a></div>
    <div id="output-${slug.name}" class="placeholder">Type something to see the output</div>
  `;
  rows.appendChild(row);
});

input.addEventListener('input', () => {
  slugs.forEach((slug) => {
    const output = document.getElementById(`output-${slug.name}`)!;
    if (input.value === '') {
      output.textContent = 'Type something to see the output';
    } else {
      output.textContent = slug.transform(input.value);
    }
  });
  compareOutputs();
});

expectedOutput.addEventListener('input', compareOutputs);

function compareOutputs() {
  slugs.forEach((slug) => {
    const output = document.getElementById(`output-${slug.name}`)!;
    if (input.value === '') {
      output.className = 'placeholder';
    } else if (expectedOutput.value === '') {
      output.className = '';
    } else if (output.textContent === expectedOutput.value) {
      output.className = 'correct';
    } else {
      output.className = 'incorrect';
    }
  });
}
