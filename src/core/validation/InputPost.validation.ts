import {body} from "express-validator";

const titleValidation = body("title")
    .exists()
    .withMessage("Title is required")

const shortDescriptionValidation =  body("shortDescription")
.exists()

const contentValidation = body("content")
.exists()
    .withMessage("Content is required")

const blogIdValidation = body("blogId")
    .exists()

export const postInputModelValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation
]