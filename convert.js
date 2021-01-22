const fs = require('fs');

const convert = s =>
  s.replace(/([a-z]+)([1-4q])/g, (match, syllable, tone) => {
    tone = {
      1: 'ˉ',
      2: 'ˊ',
      3: 'ˇ',
      4: 'ˋ',
      q: 'ˈ',
    }[tone];

    syllable = syllable
      .replace(/^j/, 'g')
      .replace(/^q/, 'k')
      .replace(/^x/, 'x')

      .replace(/^zr/, 'ż')
      .replace(/^cr/, 'ċ')
      .replace(/^sr/, 'ṡ')

      .replace(/ng/g, 'ŋ')
      .replace(/^h/, 'x')
      .replace(/^v/, 'w')

      .replace(/(?<=[żċṡr])w/g, '')
      .replace(/(?<=^[żċṡr]?r)e/, 'ǝ')
      .replace(/(?<=^[żċṡr]?r)ie/, 'e')
      .replace(/ei/, 'ǝi')
      .replace(/ou/, 'ǝu')
      .replace(/e(?=[ŋnr])/, 'ǝ');

    return syllable + tone;
  });

const name = 'lau1guo3in1';
const content = fs.readFileSync('lau_guoq_in.dict.yaml', 'utf8');
fs.writeFileSync(name + '.dict.yaml',
  convert(content)
    .replace(/(?<=name: )[^\n]+/, name)
    .replace(/iac國音/g, '老國音 (sumi)')
    .replace(/(?<=version\: )[^\n]*/, `"${new Date().toISOString().split('T')[0].replace(/-/g, '/')}"`)
);

if (false)
  fs.writeFileSync(name + '.schema.yaml',
    fs.readFileSync(nameOld + '.schema.yaml', 'utf8')
      .replace(/(?<=schema_id: )[^\n]+/, name)
      .replace(/iac國音/g, '老國音 (sumi)')
      .replace(/(?<=version\: )[^\n]*/, `"${new Date().toISOString().split('T')[0].replace(/-/g, '/')}"`)
  );
