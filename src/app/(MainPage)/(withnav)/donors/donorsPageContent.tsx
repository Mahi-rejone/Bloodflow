"use client";

import { useState } from "react";
import { useGetAllDonorsQuery } from "@/redux/feature/user/userApi";
import {
  Card,
  Select,
  Input,
  Spin,
  Alert,
  Empty,
  Avatar,
  Tag,
  Button,
} from "antd";
import {
  PhoneOutlined,
  UserOutlined,
  WhatsAppOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { MapPinIcon, DropletsIcon } from "lucide-react";
import { toWhatsAppLink } from "@/utils/whatsapp";
import Link from "next/link";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const toBloodGroupEnum = (value: string) =>
  value.replace("+", "_POS").replace("-", "_NEG");

const bloodGroupLabel = (value: string) =>
  value.replace("_POS", "+").replace("_NEG", "-");

interface DonorsPageContentProps {
  initialSearch: string;
}

export default function DonorsPageContent({
  initialSearch,
}: DonorsPageContentProps) {
  const [bloodGroup, setBloodGroup] = useState<string | undefined>();
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [town, setTown] = useState("");
  const [search, setSearch] = useState(initialSearch);

  const { data, isLoading, error } = useGetAllDonorsQuery({
    bloodGroup: bloodGroup ? toBloodGroupEnum(bloodGroup) : undefined,
    state: state || undefined,
    district: district || undefined,
    town: town || undefined,
    search: search || undefined,
  });

  const donors = data?.data ?? [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-app-text">Find Donors</h1>
        <p className="text-app-text-light mt-1">
          Search registered donors by blood group and location.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col gap-3 mb-8">
        <Input
          allowClear
          size="large"
          prefix={<SearchOutlined className="text-zinc-400" />}
          placeholder="Search by name or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <Select
            allowClear
            placeholder="Blood group"
            style={{ width: 180 }}
            value={bloodGroup}
            onChange={setBloodGroup}
            options={BLOOD_GROUPS.map((g) => ({
              value: g,
              label: g,
            }))}
          />

          <Input
            placeholder="State/Division (e.g. Dhaka Division)"
            value={state}
            onChange={(e) => setState(e.target.value)}
            style={{ maxWidth: 220 }}
          />

          <Input
            placeholder="District (e.g. Dhaka)"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            style={{ maxWidth: 220 }}
          />

          <Input
            placeholder="Town (e.g. Mirpur)"
            value={town}
            onChange={(e) => setTown(e.target.value)}
            style={{ maxWidth: 220 }}
          />
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center py-24">
          <Spin size="large" />
        </div>
      )}

      {error && <Alert type="error" message="Couldn't load donors" showIcon />}

      {!isLoading && !error && donors.length === 0 && (
        <Empty description="No donors match these filters" className="py-24" />
      )}

      {!isLoading && !error && donors.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {donors.map((donor: any) => (
            <Link key={donor.id} href={`/donors/${donor.id}`}>
              <Card className="rounded-2xl border border-app-border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar
                    size={48}
                    src={donor.profile?.img || undefined}
                    icon={<UserOutlined />}
                    className="bg-app-primary"
                  />

                  <div>
                    <p className="font-semibold text-app-text">
                      {donor.fullName || donor.username}
                    </p>

                    <Tag color="red" className="mt-1">
                      <DropletsIcon size={12} className="inline -mt-0.5 mr-1" />
                      {bloodGroupLabel(donor.profile?.bloodGroup)}
                    </Tag>
                  </div>
                </div>

                <div className="text-sm text-app-text-light space-y-1">
                  <p className="flex items-center gap-2">
                    <MapPinIcon size={14} />
                    {donor.profile?.town}, {donor.profile?.district}
                  </p>

                  {donor.profile?.phoneNumber && (
                    <p className="flex items-center gap-2 mb-2">
                      <PhoneOutlined />
                      {donor.profile.phoneNumber}
                    </p>
                  )}
                </div>

                {donor.profile?.phoneNumber && (
                  <Button
                    icon={<WhatsAppOutlined />}
                    block
                    style={{
                      backgroundColor: "#25D366",
                      color: "#fff",
                      border: "none",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      window.open(
                        toWhatsAppLink(donor.profile.phoneNumber),
                        "_blank",
                      );
                    }}
                  >
                    Contact on WhatsApp
                  </Button>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
