export {};
/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication and session routes
 *   - name: User
 *     description: User profile and account routes
 *   - name: Course
 *     description: Course management routes
 *   - name: Admin
 *     description: Administrative routes
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: ali
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ali@test.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or email already exists
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user and set auth cookies
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ali@test.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user and clear auth cookies
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */

/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: Get current logged-in user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Current user returned
 *       401:
 *         description: Authentication invalid
 *   patch:
 *     summary: Update current user profile
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ali Updated"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "ali.updated@test.com"
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /user/update-password:
 *   patch:
 *     summary: Update current user password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [oldPassword, newPassword]
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: "123456"
 *               newPassword:
 *                 type: string
 *                 example: "654321"
 *     responses:
 *       200:
 *         description: Password updated
 *       401:
 *         description: Invalid old password
 */

/**
 * @swagger
 * /user/request-instructor:
 *   post:
 *     summary: Submit instructor role request
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Request registered
 *       400:
 *         description: Request is already pending or user is instructor
 */

/**
 * @swagger
 * /user/delete-account:
 *   delete:
 *     summary: Delete current user account
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [password]
 *             properties:
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Account deleted
 *       401:
 *         description: Invalid password
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User returned
 *       403:
 *         description: Not authorized
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /course:
 *   get:
 *     summary: Get all courses
 *     tags: [Course]
 *     responses:
 *       200:
 *         description: Courses returned
 *   post:
 *     summary: Create a new course (instructor/admin)
 *     tags: [Course]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description]
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Node.js from Zero"
 *               description:
 *                 type: string
 *                 example: "Complete Node.js course"
 *               price:
 *                 type: integer
 *                 example: 100
 *               status:
 *                 type: string
 *                 enum: [draft, published]
 *                 example: draft
 *     responses:
 *       201:
 *         description: Course created
 *       403:
 *         description: Unauthorized role
 */

/**
 * @swagger
 * /course/{id}:
 *   get:
 *     summary: Get course by id
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Course returned
 *       404:
 *         description: Course not found
 *   put:
 *     summary: Update a course (owner instructor/admin)
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description]
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Node.js from Zero"
 *               description:
 *                 type: string
 *                 example: "Complete Node.js course"
 *               price:
 *                 type: integer
 *                 example: 100
 *               status:
 *                 type: string
 *                 enum: [draft, published]
 *                 example: draft
 *     responses:
 *       200:
 *         description: Course updated
 *       403:
 *         description: Not allowed to update this course
 *   delete:
 *     summary: Delete a course (owner instructor/admin)
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Course deleted
 *       403:
 *         description: Not allowed to delete this course
 */

/**
 * @swagger
 * /course/{id}/thumbnail:
 *   post:
 *     summary: Upload course thumbnail (owner instructor/admin)
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Thumbnail uploaded
 *       400:
 *         description: File is required
 */

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Users returned
 *       403:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /admin/instructor-requests:
 *   get:
 *     summary: Get pending instructor requests (admin only)
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Pending requests returned
 */

/**
 * @swagger
 * /admin/{id}:
 *   delete:
 *     summary: Delete user by id (admin only)
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User deleted
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /admin/{id}/approve-instructor:
 *   patch:
 *     summary: Approve instructor request (admin only)
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User approved as instructor
 *       400:
 *         description: User did not request instructor role
 */

/**
 * @swagger
 * /admin/{id}/reject-instructor:
 *   patch:
 *     summary: Reject instructor request (admin only)
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Instructor request rejected
 *       400:
 *         description: User did not request instructor role
 */
