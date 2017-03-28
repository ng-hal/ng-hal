import angularInline from 'rollup-plugin-angular-inline';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const TARGET= 'dist/ng-hal';

export default {
  entry: `./${TARGET}/lib/index.js`,
  dest: `./${TARGET}/bundle/ng-hal.umd.js`,
  format: 'umd',
  moduleName: 'ng.ng-hal',
  external: [
    '@angular/core',
    '@angular/common',
    '@angular/forms',
    '@angular/http',
    'rxjs/Observable',
    'rxjs/Observer',
    'halfred'
  ],
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/forms': 'ng.forms',
    '@angular/http': 'ng.http',
    'rxjs/Observable': 'Rx',
    'rxjs/Observer': 'Rx',
    'halfred': 'halfred'
  },
  plugins: [
    nodeResolve({jsnext: true, module: true}),
    commonjs(),
    angularInline({ include: `./${TARGET}/lib/**/*.component.js` })
  ],
  onwarn: (warning) => {
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }

    console.log(warning.message);
  }
}
