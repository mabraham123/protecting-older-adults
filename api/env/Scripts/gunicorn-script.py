#!C:\Users\Lenovo\github\protecting-older-adults-online\api\env\Scripts\python.exe
# EASY-INSTALL-ENTRY-SCRIPT: 'gunicorn==20.1.0','console_scripts','gunicorn'
__requires__ = 'gunicorn==20.1.0'
import re
import sys
from pkg_resources import load_entry_point

if __name__ == '__main__':
    sys.argv[0] = re.sub(r'(-script\.pyw?|\.exe)?$', '', sys.argv[0])
    sys.exit(
        load_entry_point('gunicorn==20.1.0', 'console_scripts', 'gunicorn')()
    )