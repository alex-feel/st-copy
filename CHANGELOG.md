# Changelog

## [2.0.0](https://github.com/alex-feel/st-copy/compare/v1.1.2...v2.0.0) (2026-06-17)


### ⚠ BREAKING CHANGES

* Custom Components v2 requires Streamlit >= 1.56 and Python >= 3.10 (previously Streamlit >= 1.45 and Python >= 3.9). The component is now frameless (no iframe); the public copy_button() signature and return value are unchanged.

### Features

* migrate to Streamlit Custom Components v2 and fix horizontal layout ([1831952](https://github.com/alex-feel/st-copy/commit/1831952320b2b50962c134539b810901a0a4aeba)), closes [#27](https://github.com/alex-feel/st-copy/issues/27)


### Bug Fixes

* embed the frontend bundle inline instead of via an asset_dir manifest ([34478f8](https://github.com/alex-feel/st-copy/commit/34478f8956d16a1eb0aaf8d4aec58095290927e6))
* include the frontend bundle as a wheel artifact instead of a force-include so editable builds don't require it ([d6f0036](https://github.com/alex-feel/st-copy/commit/d6f0036f8fd61b283444fa47d6d2cd514ada72c5))

## [1.1.2](https://github.com/alex-feel/st-copy/compare/v1.1.1...v1.1.2) (2025-06-15)


### Bug Fixes

* resolve issue with "Copied!" label not displaying ([6bdf299](https://github.com/alex-feel/st-copy/commit/6bdf2999ab7f1193d5d0168b18ed645329dc9d5e))
* resolve issue with "Copied!" label not displaying ([f01131b](https://github.com/alex-feel/st-copy/commit/f01131b39bb5a156c90e9a46b0f7d9fa39773a08))

## [1.1.1](https://github.com/alex-feel/st-copy/compare/v1.1.0...v1.1.1) (2025-06-13)


### Bug Fixes

* resolve glitch effect in multipage copy button ([5263a3d](https://github.com/alex-feel/st-copy/commit/5263a3dcbe9b04acf920a47ed4a6ce21f596ed20))
* resolve glitch effect in multipage copy button ([9bafb87](https://github.com/alex-feel/st-copy/commit/9bafb8798a391e4b14c7bdcc2685dabf4ca5e9e6)), closes [#18](https://github.com/alex-feel/st-copy/issues/18)

## [1.1.0](https://github.com/alex-feel/st-copy/compare/v1.0.2...v1.1.0) (2025-06-05)


### Features

* **frontend:** inline CSS via plugin ([d4c2f06](https://github.com/alex-feel/st-copy/commit/d4c2f06a28adc635948f67fcad52f80b373d63ef))
* **frontend:** report successful copy to Python ([3335acc](https://github.com/alex-feel/st-copy/commit/3335acca4dd2c0efd224d09959dce7df9e6fb89c))
* **frontend:** use preact for smaller bundle ([b4fd7fa](https://github.com/alex-feel/st-copy/commit/b4fd7fa3819bd1343f9fd2d3c8e209e224fd20b5))
* memoize handlers in copy button ([ca8bfab](https://github.com/alex-feel/st-copy/commit/ca8bfab0f0cf8fb84eb200b4aa45295e0b114508))

## [1.0.2](https://github.com/alex-feel/st-copy/compare/v1.0.1...v1.0.2) (2025-05-05)


### Bug Fixes

* ensure consistent button size by adjusting CSS visibility ([2637c65](https://github.com/alex-feel/st-copy/commit/2637c653f1abc234d78729b40f1e8b5c0ab4cce3))

## [1.0.1](https://github.com/alex-feel/st-copy/compare/v1.0.0...v1.0.1) (2025-05-05)


### Bug Fixes

* adjust material SVG icon dimensions ([bba162f](https://github.com/alex-feel/st-copy/commit/bba162f952b6306459bd9bb2efec71b874da059f))
* prevent iframe height jumps by adjusting CSS and useEffect ([97d9058](https://github.com/alex-feel/st-copy/commit/97d90582948d17846689cc98c32b1213c8cf9d2c))
