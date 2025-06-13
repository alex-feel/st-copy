import glob


def test_frontend_bundle_up_to_date():
    js_files = glob.glob('src/st_copy/frontend/dist/assets/index-*.js')
    assert js_files, 'bundle not found'
    with open(js_files[0], 'r', encoding='utf-8') as f:
        js_content = f.read()
    assert 'Clipboard API not available' in js_content, (
        'bundle not updated; run npm build'
    )
