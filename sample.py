from my_skills import skills

for skill in skills:
    new_skill = skill.split("_")
    print(" ".join(new_skill).capitalize())