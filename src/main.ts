import slug from 'slug';
import slugify from 'slugify';
import sindreSorhusSlugify from '@sindresorhus/slugify';
import vocaSlugify from 'voca/slugify';
import lodashKebabCase from 'lodash/kebabCase';

const slugs: {
  name: string;
  transform: (input: string) => string;
  npm?: string;
  rowEl?: HTMLDivElement;
  outputEl?: HTMLDivElement;
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
  row.dataset.state = 'placeholder';
  row.innerHTML = `
    <div><a href="https://npmjs.com/package/${slug.npm ?? slug.name}" target="_blank" rel="noreferrer">${slug.name}</a></div>
  `;
  rows.appendChild(row);

  const output = document.createElement('div')
  output.innerText = 'Type something to see the output'
  row.appendChild(output);
  
  slug.rowEl = row;
  slug.outputEl = output;
});

input.addEventListener('input', () => {
  slugs.forEach((slug) => {
    const output = slug.outputEl!
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
    const row = slug.rowEl!;
    const output = slug.outputEl!;
    if (input.value === '') {
      row.dataset.state = 'placeholder';
    } else if (expectedOutput.value === '') {
      row.dataset.state = '';
    } else if (output.textContent === expectedOutput.value) {
      row.dataset.state = 'correct';
    } else {
      row.dataset.state = 'incorrect';
    }
  });
}
