-- CreateEnum
CREATE TYPE "FormFieldType" AS ENUM ('TEXT', 'EMAIL');

-- CreateTable
CREATE TABLE "BurnerEvent" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" STRING NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BurnerEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormField" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" STRING NOT NULL,
    "type" "FormFieldType" NOT NULL,
    "required" BOOL NOT NULL,
    "burnerEventId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormFieldResponse" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "formFieldId" UUID NOT NULL,
    "value" STRING NOT NULL,
    "registrationId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormFieldResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserEventRegistration" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "eventId" UUID NOT NULL,
    "email" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserEventRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormFieldResponse_formFieldId_registrationId_key" ON "FormFieldResponse"("formFieldId", "registrationId");

-- CreateIndex
CREATE UNIQUE INDEX "UserEventRegistration_eventId_email_key" ON "UserEventRegistration"("eventId", "email");

-- AddForeignKey
ALTER TABLE "FormField" ADD CONSTRAINT "FormField_burnerEventId_fkey" FOREIGN KEY ("burnerEventId") REFERENCES "BurnerEvent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormFieldResponse" ADD CONSTRAINT "FormFieldResponse_formFieldId_fkey" FOREIGN KEY ("formFieldId") REFERENCES "FormField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormFieldResponse" ADD CONSTRAINT "FormFieldResponse_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "UserEventRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEventRegistration" ADD CONSTRAINT "UserEventRegistration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "BurnerEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
