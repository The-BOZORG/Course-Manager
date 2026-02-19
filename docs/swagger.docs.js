export {};
/**
 * @swagger
 * tags:
 *   - name: auth
 *     description: authentication and session routes
 *   - name: user
 *     description: user profile and account routes
 *   - name: course
 *     description: course management routes
 *   - name: admin
 *     description: administrative routes
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: register a new user
 *     tags: [auth]
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
 *         description: user registered successfully
 *       400:
 *         description: validation error or email already exists
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: login user and set auth cookies
 *     tags: [auth]
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
 *         description: login successful
 *       401:
 *         description: invalid credentials
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: logout user and clear auth cookies
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: logout successful
 */

/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: get current logged-in user
 *     tags: [user]
 *     responses:
 *       200:
 *         description: current user returned
 *       401:
 *         description: authentication invalid
 *   patch:
 *     summary: update current user profile
 *     tags: [user]
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
 *         description: user updated
 *       400:
 *         description: invalid input
 */

/**
 * @swagger
 * /user/update-password:
 *   patch:
 *     summary: update current user password
 *     tags: [user]
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
 *         description: password updated
 *       401:
 *         description: invalid old password
 */

/**
 * @swagger
 * /user/request-instructor:
 *   post:
 *     summary: submit instructor role request
 *     tags: [user]
 *     responses:
 *       200:
 *         description: request registered
 *       400:
 *         description: request is already pending or user is instructor
 */

/**
 * @swagger
 * /user/delete-account:
 *   delete:
 *     summary: delete current user account
 *     tags: [user]
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
 *         description: account deleted
 *       401:
 *         description: invalid password
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: get user by id
 *     tags: [user]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: user returned
 *       403:
 *         description: not authorized
 *       404:
 *         description: user not found
 */

/**
 * @swagger
 * /course:
 *   get:
 *     summary: get all courses
 *     tags: [course]
 *     responses:
 *       200:
 *         description: courses returned
 *   post:
 *     summary: create a new course (instructor/admin)
 *     tags: [course]
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
 *         description: course created
 *       403:
 *         description: unauthorized role
 */

/**
 * @swagger
 * /course/{id}:
 *   get:
 *     summary: get course by id
 *     tags: [course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: course returned
 *       404:
 *         description: course not found
 *   put:
 *     summary: update a course (owner instructor/admin)
 *     tags: [course]
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
 *         description: course updated
 *       403:
 *         description: not allowed to update this course
 *   delete:
 *     summary: delete a course (owner instructor/admin)
 *     tags: [course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: course deleted
 *       403:
 *         description: not allowed to delete this course
 */

/**
 * @swagger
 * /course/{id}/thumbnail:
 *   post:
 *     summary: upload course thumbnail (owner instructor/admin)
 *     tags: [course]
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
 *         description: thumbnail uploaded
 *       400:
 *         description: file is required
 */

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: get all users (admin only)
 *     tags: [admin]
 *     responses:
 *       200:
 *         description: users returned
 *       403:
 *         description: unauthorized
 */

/**
 * @swagger
 * /admin/instructor-requests:
 *   get:
 *     summary: get pending instructor requests (admin only)
 *     tags: [admin]
 *     responses:
 *       200:
 *         description: pending requests returned
 */

/**
 * @swagger
 * /admin/{id}:
 *   delete:
 *     summary: delete user by id (admin only)
 *     tags: [admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: user deleted
 *       404:
 *         description: user not found
 */

/**
 * @swagger
 * /admin/{id}/approve-instructor:
 *   patch:
 *     summary: approve instructor request (admin only)
 *     tags: [admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: user approved as instructor
 *       400:
 *         description: user did not request instructor role
 */

/**
 * @swagger
 * /admin/{id}/reject-instructor:
 *   patch:
 *     summary: reject instructor request (admin only)
 *     tags: [admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: instructor request rejected
 *       400:
 *         description: user did not request instructor role
 */
