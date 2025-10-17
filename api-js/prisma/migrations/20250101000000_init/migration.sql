-- CreateTable
CREATE TABLE "metrics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "unit" TEXT,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "recorded_at" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'inactive',
    "company_name" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

