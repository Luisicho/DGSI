from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in semovinay/__init__.py
from semovinay import __version__ as version

setup(
	name="semovinay",
	version=version,
	description="Aplicación para la Secretaría de Movilidad de Nayarit",
	author="DGSTI / SAF",
	author_email="redessaf2@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
