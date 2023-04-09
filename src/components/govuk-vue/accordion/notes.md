# Temporary documentation notes

If accordion sections are dynamic (ie may or may not be shown), assign them ids manually with the id prop
otherwise the stored expansion state may target the wrong section (as the ID may be different to the last time the 
accordion was rendered)