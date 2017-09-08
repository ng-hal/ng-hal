
// TODO: builders for resources would also be cool :-)
// https://github.com/dherges/ng-hal/issues/6#issuecomment-325466599
/*
this.http.post(linksFrom(foo).rel('bar'), resourceFrom({}).withSelfHref('foo/bar') )

const foo = { _links: { self: { href: 'foo/bar' } } };
resourceFrom({}).withSelfRel(foo));

resourceFrom({}).withRel('next', 'foo/bar'));
resourceFrom({}).withRel('next', { href: 'foo/{bar}', templated: true } ));
*/
