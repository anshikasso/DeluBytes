def roadmap_level(percent):
    if percent < 40:
        return "beginner"
    elif percent < 70:
        return "intermediate"
    else:
        return "advanced"
