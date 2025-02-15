--データベース作成
CREATE DATABASE qualification_manager;

-- users テーブル
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- qualification テーブル
CREATE TABLE qualifications (
    qualification_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    money INT
);

-- tasksテーブル
CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    progress FLOAT,
    goal INT DEFAULT 100,
    deadline DATE,
    qualification_id INT REFERENCES qualifications(qualification_id) ON DELETE CASCADE,
    learningtools_id INT REFERENCES learning_tools(learningtools_id) ON DELETE CASCADE
);

-- learning_toolsテーブル
CREATE TABLE learning_tools (
    learningtools_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    total INT NOT NULL,
    cover_image TEXT,
    qualification_id INT REFERENCES qualifications(qualification_id) ON DELETE CASCADE
);

-- exam_schedulesテーブル
CREATE TABLE exam_schedules (
    schedule_id SERIAL PRIMARY KEY,
    qualification_id INT REFERENCES qualifications(qualification_id) ON DELETE CASCADE,
    exam_date DATE NOT NULL,
    application_deadline DATE,
    location VARCHAR(255) NOT NULL,
    method VARCHAR(255) NOT NULL
);

-- users_qualificationsテーブル（中間テーブル）
CREATE TABLE users_qualifications (
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    qualification_id INT REFERENCES qualifications(qualification_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, qualification_id), -- 重複データを防ぐために.
    goal_score INT DEFAULT NULL -- 目標スコア（NULLなら通常の合格/不合格）
);

-- qualification_learning_toolsテーブル（中間テーブル）
CREATE TABLE qualification_learning_tools (
    qualification_id INT REFERENCES qualifications(qualification_id) ON DELETE CASCADE,
    learningtools_id INT REFERENCES learning_tools(learningtools_id) ON DELETE CASCADE,
    PRIMARY KEY (qualification_id, learningtools_id) -- 重複データを防ぐために.
);
