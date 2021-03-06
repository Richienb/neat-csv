import test from 'ava';
import toReadableStream from 'to-readable-stream';
import neatCsv from '.';

test('buffer', async t => {
	const data = await neatCsv(Buffer.from('name,val\nfoo,1\nbar,2'));
	t.is(data[0].name, 'foo');
	t.is(data[1].name, 'bar');
});

test('string', async t => {
	const data = await neatCsv('name;val\nfoo;1\nbar;2', {separator: ';'});
	t.is(data[0].name, 'foo');
	t.is(data[1].name, 'bar');
});

test('stream', async t => {
	const data = await neatCsv(toReadableStream('name,val\nfoo,1\nbar,2'));
	t.is(data[0].name, 'foo');
	t.is(data[1].name, 'bar');
});

test('error', async t => {
	await t.throwsAsync(neatCsv('name,val\nfoo,1,3\nbar,2', {strict: true}), /Row length does not match headers/);
});
