import Spinner from "@/components/Spinner";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "lucide-react";
import Title from "@/components/Title";

export default function MyProfile() {
  const { pathname } = useLocation();
  return (
    <>
      <Title>Profile</Title>
      <div className="flex flex-1 flex-col gap-4 md:gap-8">
        <div className="mx-auto grid w-full  items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <div className="md:grid gap-4 text-sm text-muted-foreground hidden">
            <Link
              to="/my-profile"
              className={pathname === "/my-profile" ? "text-primary" : ""}
            >
              General
            </Link>
            <Link
              to="/my-profile/preferences"
              className={
                pathname === "/my-profile/preferences" ? "text-primary" : ""
              }
            >
              Preferences
            </Link>
          </div>
          <div className="md:hidden z-1">
            <Breadcrumb className="mb-4 cursor-pointer">
              <BreadcrumbList>
                <BreadcrumbItem className="cursor-pointer">
                  <BreadcrumbPage>
                    <Link
                      to="/my-profile"
                      className={
                        pathname === "/my-profile" ? "text-primary" : ""
                      }
                    >
                      General
                    </Link>
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem className="cursor-pointer">
                  <BreadcrumbPage>
                    <Link
                      to="/my-profile/preferences"
                      className={
                        pathname === "/my-profile/preferences"
                          ? "text-primary"
                          : ""
                      }
                    >
                      Preferences
                    </Link>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Separator />
          </div>
          <div className="grid gap-6 relative">
            <Separator
              orientation="vertical"
              className="absolute top-0 -left-10"
            />

            <Suspense fallback={<Spinner />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
